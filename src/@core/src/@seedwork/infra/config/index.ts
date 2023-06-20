import { config as readEnv } from "dotenv";
import { join } from "path";

type Config = {
  db: {
    vendor: any;
    host: string;
    logging: boolean;
  };
};

function makeConfig(envFile): Config {
  const output = readEnv({ path: envFile });

  return {
    db: {
      vendor: 'sqlite',
      host: ':memory:',
      logging: false,
      // vendor: output.parsed.DB_VENDOR as any,
      // host: output.parsed.DB_HOST,
      // logging: output.parsed.DB_LOGGING === "true",
      // logging: false,
    },
  };
}

const envTestingFile = join(__dirname, "../../../../.env.test");
export const configTest = makeConfig(envTestingFile);
