{
  pkgs,
  lib,
  config,
  inputs,
  ...
}: let
  unstable = import inputs.unstable-nixpkgs {
    inherit (pkgs.stdenv) system;
    config.allowUnfree = true;
  };
in {
  cachix.enable = false;
  name = "ogrodje-site";

  packages = [
    unstable.nodejs_24
    pkgs.git
  ];

  languages.javascript = {
    enable = true;
    package = unstable.nodejs_24;
    yarn.enable = true;
    yarn.install.enable = true;
    yarn.package = unstable.yarn-berry;
  };
}
