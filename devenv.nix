{ pkgs, lib, config, inputs, ... }:

{
  name = "ogrodje-site";

  packages = [
    pkgs.git
  ];


  languages.javascript = {
	enable = true;
	package = pkgs.nodejs_22;
	yarn.enable = true;
	yarn.install.enable = true;
  };

  enterShell = ''
    echo "--- ogrodje-site ---"
  '';

  enterTest = ''
    echo "Running tests"
  '';

}
