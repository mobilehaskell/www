
{
  description = "mobilehaskell dev shell";
  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixpkgs-unstable";
    flake-utils.url = "github:numtide/flake-utils";
  };
  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          nativeBuildInputs = with pkgs.buildPackages; [ nodejs yarn ];
          shellHook = ''
            echo "Welcome to to the nix-shell for www.mobilehaskell.org"
            echo "Run "npm run start", to launch the local development preview"

            function build() {
              npm run build
            }
          '';
        };
      }
    );
}
