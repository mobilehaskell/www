{ pkgs ? import (fetchTarball https://github.com/NixOS/nixpkgs/archive/b387b736065fff4755fc8676ead59e59efc82262.tar.gz) {} }:
  pkgs.mkShell {
    nativeBuildInputs = with pkgs.buildPackages; [ nodejs yarn ];
    shellHook = ''
        echo "Welcome to to the nix-shell for www.mobilehaskell.org"
        echo "Run "yarn start", to launch the local development preview"
    '';
}