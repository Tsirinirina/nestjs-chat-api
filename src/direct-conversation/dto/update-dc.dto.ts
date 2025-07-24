import { PartialType } from '@nestjs/swagger';
import { CreateDCDto } from './create-dc.dto';

export class UpdateDCDto extends PartialType(CreateDCDto) {}
