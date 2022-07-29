import { DataSourceOptions } from "typeorm"

export default {
  type: 'postgres',
  host: process.env.POSTGRES_DB,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: [
    __dirname + 'dist/**/*.entity{.ts,.js}',
  ],
  synchronize: true,
  autoLoadEntities: true,
} as DataSourceOptions