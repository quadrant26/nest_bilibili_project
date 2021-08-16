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

  async deleteProject(projectId: string) {
    try {
      await this.projectModel.findByIdAndDelete(projectId);
      this.response = {
        code: 0,
        msg: '项目删除成功',
      };
    } catch (error) {
      logger.warn('项目删除失败');
      this.response = {
        code: 5,
        msg: '删除失败',
      };
    } finally {
      return this.response;
    }
  }

  async alterProject(projectId: string, project: Project) {
    try {
      await this.projectModel.findByIdAndUpdate(projectId, project);
      this.response = {
        code: 0,
        msg: '更新成功',
      };
    } catch (error) {
      logger.warn('项目更新失败');
      this.response = {
        code: 5,
        msg: '更新失败',
      };
    } finally {
      return this.response;
    }
  }

  async findProjectById(projectId: string) {
    try {
      const data = await this.projectModel.findById(projectId);
      this.response = {
        code: 0,
        msg: '查询成功',
        data,
      };
    } catch (error) {
      logger.warn('查询失败');
      this.response = {
        code: 5,
        msg: '查询失败',
      };
    } finally {
      return this.response;
    }
  }
}
