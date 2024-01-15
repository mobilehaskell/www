---
sidebar_position: 4
---

# Frequently Asked Questions

This page tries to help answer some common questions.

### You are seriously saying I can build iOS and Android application with Haskell today?

Yes. Yes, you can! If you want to convince yourself, get a copy of [simplex-chat](https://github.com/simplex-chat/simplex-chat) from the AppStore or Play Store.

### Why are we using nix? Can't we just do it with Cabal and GHC?

While it would be great if we could do this today, we can't. GHC is still a
mono-target compiler, and even though we could create a shell wrapper such
that the `ghc` executable understood `-target`, and subsequently would dispatch
to different compilers, `cabal-install` is still very far away from being
multi-target aware. Luckily this is being worked on.

### Why are we using a highly patched GHC?

Building mobile applications with GHC is still a fairly new thing, and there are
occationally bugs we only run into when cross compiling. This often requires
patching compilers. While we try to upstream as much as we can, for some older
compilers upstream GHC has no intentions of ever releasing any new compilers, and
as such we patch old compiler series. On the other hand we may put patches into
todays compilers early before they are merged into upstream and end up in a release.

### What is the relationship with haskell.nix?

[haskell.nix](https://github.com/input-output-hk/haskell.nix) is a project that
allows to seamlessly build a haskell project with nix. This allows us to tap into
the features of nix, and especially [nixpkgs](https://github.com/NixOS/nixpkgs),
which allows us to easily provision cross compilation toolchains.