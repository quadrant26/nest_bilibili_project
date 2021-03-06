import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectSchema } from './Schema/project.schema';
import { UserSchema } from './Schema/user.schema';

const MONGO_MODELS = MongooseModule.forFeature([
  {
    name: 'USER_MODEL',
    schema: UserSchema,
    collection: 'user',
  },
  {
    name: 'PROJECT_MODEL',
    schema: ProjectSchema,
    collection: 'project',
  },
]);

@Global()
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_bilibili', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    MONGO_MODELS,
  ],
  exports: [MONGO_MODELS],
})
export class DbModule {}
