with import <nixpkgs> { config.allowBroken = true; };

stdenv.mkDerivation {
    name = "ogrodje-site";
    buildInputs = [
      nodejs_21
      yarn
    ];
    shellHook = ''
      export PATH="$PWD/node_modules/.bin/:$PATH"
      mkdir -p $PWD/node_modules/.bin/
      yarn install
    '';
}
