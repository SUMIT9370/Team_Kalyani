# To learn more about how to use Nix to configure your environment
# see: https://developers.google.com/idx/guides/customize-idx-env
{ pkgs, ... }: {
  # Which nixpkgs channel to use.
  channel = "stable-24.05"; # or "unstable"
  # Use https://search.nixos.org/packages to find packages
  packages = [
    pkgs.nodejs_20
  ];
  # Sets environment variables in the workspace
  env = {
    #
    # ===================================================================
    # CRITICAL: YOUR KEY MUST BE INSIDE QUOTES AND BE A NEW, SECRET KEY
    # ===================================================================
    # 1. GO HERE: https://makersuite.google.com/app/apikey
    # 2. CREATE A NEW, SECRET API KEY.
    # 3. PASTE THE NEW KEY IN THE LINE BELOW, REPLACING THE OLD ONE.
    # ===================================================================
    #
    VITE_GEMINI_API_KEY = "AIzaSyBHA4qEm372HoyugnazOGG6c2ZEppImXHI";
  };
  idx = {
    # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
    extensions = [
      "google.gemini-cli-vscode-ide-companion"
    ];
    # Enable previews
    previews = {
      enable = true;
      previews = {
        web = {
          command = ["npm" "run" "dev"];
          manager = "web";
          env = {
            PORT = "$PORT";
          };
        };
      };
    };
    # Workspace lifecycle hooks
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        npm-install = "npm install";
        default.openFiles = [ ".idx/dev.nix" "README.md" ];
      };
      # Runs when the workspace is (re)started
      onStart = {};
    };
  };
}
