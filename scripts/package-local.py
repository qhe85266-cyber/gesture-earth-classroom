"""Package a built checkout without dependencies, private notes, or scratch files."""
from pathlib import Path
import shutil
import zipfile

root = Path(__file__).resolve().parent.parent
out = root / 'outputs'
out.mkdir(exist_ok=True)
if not (root / 'dist/index.html').is_file():
    raise SystemExit('Run npm run build before packaging.')
shutil.copyfile(root / 'THIRD-PARTY-NOTICES.md', root / 'dist/THIRD-PARTY-NOTICES.md')
archive = out / 'Gesture-Earth-V0.1-本地验收包.zip'
with zipfile.ZipFile(archive, 'w', zipfile.ZIP_DEFLATED) as target:
    for folder in ['dist', 'public', 'src', 'scripts', 'tests']:
        for path in sorted((root / folder).rglob('*')):
            if path.is_file() and '.DS_Store' not in path.parts and '__pycache__' not in path.parts:
                target.write(path, path.relative_to(root))
    for name in ['docs/ARCHITECTURE.md', 'docs/数据核验.md', 'THIRD-PARTY-NOTICES.md',
                 'package.json', 'package-lock.json', 'tsconfig.json', 'vite.config.ts',
                 'index.html', 'README.md', '启动本地预览.command', '启动本地预览.cmd']:
        target.write(root / name, name)
with zipfile.ZipFile(archive) as target:
    assert target.testzip() is None
    for name in ['public/models/hand_landmarker.task', 'public/data/china.json',
                 'dist/index.html', 'scripts/serve.mjs', 'THIRD-PARTY-NOTICES.md']:
        assert name in target.namelist(), name
print('Verified local review archive:', archive.name)
