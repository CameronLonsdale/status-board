import chalk from 'chalk';
import * as path from 'path';
import { logger } from './logger';
import { installDependencies } from './package-dependency-manager';

export function installDependencie(
  options: { install: boolean },
  callback: (error?: string) => void,
) {
  const packagesLocalFolder = path.join(process.cwd(), '/packages');

  if (options.install) {
    logger.log(chalk.gray('Installing dependencies...'));
    installDependencies([packagesLocalFolder], (error: any) => {
      if (error) {
        return callback(error);
      }
      logger.log(chalk.green('done!'));
      return callback();
    });
  } else {
    return callback();
  }
}
