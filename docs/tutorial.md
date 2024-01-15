---
sidebar_position: 2
---

# Quick Start Tutorial

In this tutorial we'll build a very simple Haskell hello world application. We
will then show how to wrap that application into a platform native UI.

You may be asking why don't we write the UI in haskell as well? While this is
a tempting idea, we are not there yet. And the Developer Experience of writing
the UI in the respective platform toolkit is still vastly superior to writing
anything in haskell for now.

:::note
To build iOS application you will need a mac with Apple Silicon. E.g. M1, M2, ...
:::

## Prerequisits

We will need ghc, cabal and nix. The [determinate.systems nix-installer](https://github.com/DeterminateSystems/nix-installer) is a fairly good alternative to the [nixos nix-installer](https://nixos.org/download). Both should
work. After nix is installed, we can use IOG's [DevX Shell](http://github.com/input-output-hk/devx), to easily
get a working haskell environment with GHC and cabal.

:::info
We will use the `-minimal` flavour as we do not need `hlint` or `hls` for this right now. Feel free to read up
on the other flavours available for the DevX Shell.
:::

```bash
$ nix develop github:input-output-hk/devx#ghc96-minimal --refresh
```

## A hello world library

To illustrate the the process, we will utilise a simple Haskell library that
takes a String as input and produces a String as output. While this is may seem
fairly trivial (and you would be right), it serves to illustrate the process
quite well.

### Cabal Project

We start out in our development shell by asking cabal to create an example project
```
cabal init example
```
We select `(3) Library and Executable` and then just follow with the defaults.

This gives us a haskell package in the `example` directory.
```
example/
├── CHANGELOG.md
├── LICENSE
├── app
│   └── Main.hs
├── example.cabal
├── src
│   └── MyLib.hs
└── test
    └── Main.hs
```

We add this to a `cabal.project` file with

```
-- cabal.project file
packages: example
```

The project gave us a `someFunc` function in `src/MyLib.hs` we'll use this and
just modify it a little to
```
someFunc :: String -> String
someFunc name = "Hello, " ++ name ++ "!"
```

The `main` function in `app/Main.hs` we change to
```
main :: IO ()
main = do
  putStrLn (MyLib.someFunc "Haskell")
```

### Building with cabal-install

To build this with `cabal-install`, we can run `cabal build all`, and `cabal run`
to run the application. This will print "Hello, Haskell!"

```
$ cabal run
Hello, Haskell!
```

### Building with nix

As we are going to need to cross compile our library to make it usable to embed
into an iOS or Android application (or desktop application), we will use `nix`
and specifically the `haskell.nix` framework to do this. For this, we create
a `flake.nix` in the same folder that holds the `example` package, and `cabal.project` file.

```
# flake.nix
{
  description = "A simple flake for building the hello package with haskell.nix";

  inputs = {
    flake-utils.url = "github:numtide/flake-utils";
    haskellNix.url = "github:input-output-hk/haskell.nix";
    # for caching you want to follow haskell.nix's nixpkgs-unstable pins.
    nixpkgs.follows = "haskellNix/nixpkgs-unstable";
  };
  outputs = { self, flake-utils, haskellNix, nixpkgs, ...}@inputs:
    let compiler-nix-name = "ghc963"; in
    let flake = flake-utils.lib.eachDefaultSystem (system:
        let
            # This sets up the `pkgs`, by importing the nixpkgs flake and
            # adding the haskellNix overlay.
            # We need the iohkNix overlays to get the necessary cryto packages.
            # secp256k1, blst, and libsodium.
            pkgs = import nixpkgs {
                inherit system;
                overlays = with inputs; [
                    haskellNix.overlay
                ];
                # Also ensure we are using haskellNix config. Otherwise we won't be
                # selecting the correct wine version for cross compilation.
                inherit (haskellNix) config;
            };

            # If we are building a haskell project (e.g. the current directory)
            # we'd use this to get the haskell packages from the current project.
            # This expects a `cabal.project` file to be present.
            hsPkgs = pkgs.haskell-nix.project' {
                inherit compiler-nix-name;
                src = ./.;
            };
        in hsPkgs.flake {}
    ); in flake;
}
```

We also need to make sure that `example`, `cabal.project`, and `flake.nix` are
part of a `git` repository. `git init`, `git add .` should do the trick.

With this, we can then build the `example` executable from the `example` package:
```bash
$ nix build .#example:exe:example
```


:::note
We need to use `--option allow-import-from-derivation true`, because haskell.nix
uses `import-from-derivation` to dynamically construct nix expressions for haskell
projects.
:::

## Adding a foreign function export

We need to have a way to call into our library from outside of haskell.  This is
usually from C.

:::note
For non-C languages, they often offer some C foreign function
interface to call a C function. C is simply the lingua franca for interop right now.
:::