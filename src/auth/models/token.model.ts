import { ApiProperty } from '@nestjs/swagger';

export interface PayloadToken {
  /**
   * The subject identifier.
   */
  sub: number;
}

// Decorate properties with ApiProperty to provide additional documentation
export class PayloadTokenDto implements PayloadToken {
  @ApiProperty({ description: 'The role of the user.' })
  role: string;

  @ApiProperty({ description: 'The subject identifier.' })
  sub: number;
}
