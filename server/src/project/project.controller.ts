import { Body, Controller, Post } from '@nestjs/common';
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
}
