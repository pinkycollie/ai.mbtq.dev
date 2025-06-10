{ pkgs }: {
  deps = [
    pkgs.python310
    pkgs.python310Packages.pip
    pkgs.python310Packages.uvicorn
    pkgs.python310Packages.fastapi
    pkgs.python310Packages.python-dotenv
    pkgs.python310Packages.sqlalchemy
    pkgs.python310Packages.pydantic
    pkgs.python310Packages.httpx
    pkgs.python310Packages.pytest
    pkgs.python310Packages.black
    pkgs.python310Packages.isort
    pkgs.python310Packages.mypy
    pkgs.python310Packages.flake8
  ];
}
