with import <nixpkgs> { config.allowBroken = true; };

stdenv.mkDerivation {
    name = "ogrodje-site";
    buildInputs = [
      nodejs_21
      nodePackages.node-gyp
      nodePackages.node-gyp-build
      yarn
    ] ++ (
          pkgs.lib.optionals pkgs.stdenv.isDarwin [
            pkgs.darwin.apple_sdk.frameworks.Security
            pkgs.darwin.apple_sdk.frameworks.CoreServices
            pkgs.darwin.apple_sdk.frameworks.CoreFoundation
            pkgs.darwin.apple_sdk.frameworks.Foundation
            pkgs.darwin.apple_sdk.frameworks.AppKit
          ]
    );
    npm_config_force_process_config = true;

    shellHook = ''
      export PATH="$PWD/node_modules/.bin/:$PATH"
      mkdir -p $PWD/node_modules/.bin/
      yarn install
    '';
}
