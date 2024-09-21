import gulp from 'gulp';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

const SRC_DIR = 'src/wasm/go';
const PUBLIC_DIR = 'public/wasm/build';
const WASM_EXEC_DIR = 'public/wasm';


gulp.task('build', (done) => {

  fs.readdir(SRC_DIR, (err, files) => {
    if (err) {
      console.error('Error reading source directory:', err);
      done(err);
      return;
    }

    const goFiles = files.filter((file) => file.endsWith('.go'));

    const buildPromises = goFiles.map((file) => {
      const fileNameWithoutExt = path.basename(file, '.go');
      const outputWasmPath = path.join(PUBLIC_DIR, `${fileNameWithoutExt}.wasm`);

      return new Promise((resolve, reject) => {
        const buildCommand = `GOOS=js GOARCH=wasm go build -o ${outputWasmPath} ${path.join(SRC_DIR, file)}`;

        exec(buildCommand, (err, stdout, stderr) => {
          if (err) {
            console.error(`Error building ${file}:`, stderr);
            reject(err);
          } else {
            console.log(`Built ${file} to ${outputWasmPath}`);
            resolve();
          }
        });
      });
    });

    Promise.all(buildPromises)
      .then(() => {
        console.log('All Go files built successfully!');
        done();
      })
      .catch((err) => {
        console.error('Error building Go files:', err);
        done(err);
      });
  });
});


gulp.task('copy-wasm-exec', (done) => {
  const goRootCommand = 'go env GOROOT';
  exec(goRootCommand, (err, stdout, stderr) => {
    if (err) {
      console.error('Error fetching Go root path:', stderr);
      done(err);
      return;
    }

    const goRoot = stdout.trim();
    const wasmExecSource = path.join(goRoot, 'misc/wasm/wasm_exec.js');
    const wasmExecDest = path.join(WASM_EXEC_DIR, 'wasm_exec.js');

    fs.copyFile(wasmExecSource, wasmExecDest, (err) => {
      if (err) {
        console.error('Error copying wasm_exec.js:', err);
        done(err);
        return;
      }
      console.log('wasm_exec.js copied to public directory.');
      done();
    });
  });
});

gulp.task('default', gulp.series('build', 'copy-wasm-exec'));
