import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from 'src/interface/project.interface';
import { IResponse } from 'src/interface/response.interface';

const logger = new Logger('project.service');

@Injectable()
export class ProjectService {
  private response: IResponse;
  constructor(
    @InjectModel('PROJECT_MODEL') private readonly projectModel: Model<Project>,
  ) {}

  async createProject(project: Project) {
    const createProject = new this.projectModel(project);
    try {
      const data = await createProject.save();
      this.response = {
        code: 0,
        msg: '项目创建成功',
        data: data,
      };
    } catch (error) {
      logger.warn('创建项目失败');
      this.response = {
        code: 5,
        msg: '创建项目失败',
      };
    } finally {
      return this.response;
    }
  }
}
