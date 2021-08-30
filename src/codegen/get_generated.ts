import { DirEnt, DirEntT } from '../fs/mod';
import { A, D, DEntry, Dict, Num, O, Str } from '../mod';
import { _ } from '../ts/pipe';
import { TypeDef } from './domain/mod';

// type TypeDef = {
//   readonly generics: ArrT<string>;
// };

function generateType(code: string): string {
  return _(code)
    ._(Str.split('export '))
    ._(A.filter(Str.startsWith('type')))
    ._(A.lookup(0))
    ._(
      O.matchSome((s) =>
        _(s)
          ._(Str.split(' '))
          ._(A.lookup(1))
          ._(
            O.matchSome((g) =>
              _(g)
                ._(Str.replaceAll('>', ''))
                ._(Str.split('<'))
                ._(A.lookup(1))
                ._(
                  O.match({
                    None: () => A.createEmpty<string>(),
                    Some: (s) => [s],
                  })
                )
                ._(TypeDef.createFromGenerics)
                ._v()
            )
          )
          ._v()
      )
    )
    ._(
      O.match({
        None: () => 'wrong',
        Some: (s) => JSON.stringify(s, undefined, 2),
      })
    )
    ._v();
}

function generateDomain(dir: Dict<DirEntT>): Dict<DirEntT> {
  return _(dir)
    ._(D.toDEntryArr)
    ._(
      A.map((entry) =>
        _(entry.value)
          ._(
            DirEnt.matchElse({
              File: (content) =>
                entry.key === 'mod.ts' ||
                _(entry.key)._(Str.split('.'))._(A.length)._(Num.lt(2))._v()
                  ? DEntry.from({
                      key: entry.key,
                      value: O.None.asOptionFrom<DirEntT>(),
                    })
                  : DEntry.from({
                      key: _(entry.key)
                        ._(Str.split('.'))
                        ._(A.replace(1, Str.prepend('g.')))
                        ._(Str.fromArr('.'))
                        ._v(),
                      value: _(content)
                        ._(generateType)
                        ._(DirEnt.File.from)
                        ._(O.Some.from)
                        ._v(),
                    }),
              fallback: () =>
                DEntry.from({
                  key: entry.key,
                  value: O.None.asOptionFrom<DirEntT>(),
                }),
            })
          )
          ._v()
      )
    )
    ._(D.fromDEntryArr)
    ._(D.compactOption)
    ._v();
}

export function generateDir(dir: Dict<DirEntT>): Dict<DirEntT> {
  return _(dir)
    ._(
      D.mapValues((ent, name) =>
        _(ent)
          ._(
            DirEnt.mapElse({
              Dir: (dir) =>
                _(dir)
                  ._(
                    DirEnt.Dir.copy({
                      child: name === 'domain' ? generateDomain : generateDir,
                    })
                  )
                  ._(O.Some.asOptionFrom)
                  ._v(),
              fallback: () => O.None.asOptionFrom<DirEntT>(),
            })
          )
          ._v()
      )
    )
    ._(D.compactOption)
    ._v();
}
