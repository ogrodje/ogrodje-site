{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: let
  unstable-pkgs = import inputs.unstable-nixpkgs {
    inherit (pkgs.stdenv) system;
    config.allowUnfree = true;
  };
in {
  cachix.enable = false;
  name = "ogrodje-site";

  packages = [
    unstable-pkgs.nodejs_24
    pkgs.git
  ];

  languages.javascript = {
    enable = true;
    package = unstable-pkgs.nodejs_24;
    yarn.enable = true;
    yarn.install.enable = true;
    yarn.package = unstable-pkgs.yarn-berry;
  };

  #enterShell = ''
  #  yarn install
  #'';
}
