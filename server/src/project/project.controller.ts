import { Body, Controller, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Project } from 'src/interface/project.interface';
import { ProjectService } from './project.service';

@Controller('project')
@ApiTags('项目')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  @ApiOperation({ summary: '创建新项目' })
  async addProject(@Body() project: Project) {
    return this.projectService.createProject(project);
  }

  @Post('delete/:id')
  @ApiOperation({ summary: '删除项目' })
  async removeProject(@Param('id') projectId: string) {
    return this.projectService.deleteProject(projectId);
  }

  @Post('update/:id')
  @ApiOperation({ summary: '更新项目 ' })
  async updateProject(
    @Param('id') projectId: string,
    @Body() project: Project,
  ) {
    return this.projectService.alterProject(projectId, project);
  }

  @Post('find/:id')
  @ApiOperation({ summary: '查询项目' })
  async findOneById(@Param('id') projectId: string) {
    return this.projectService.findProjectById(projectId);
  }
}
