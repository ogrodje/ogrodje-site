{ pkgs, lib, config, inputs, ... }:

{
  packages = [ 
    # pkgs.git
  ];


  languages.javascript = {
    enable = true;
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
