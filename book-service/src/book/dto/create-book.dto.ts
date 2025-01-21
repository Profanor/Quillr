import { IsString, IsUUID, IsInt } from 'class-validator';

export class CreateBookDto {
    @IsString()
    title: string;
    
    @IsUUID()
    authorId: string;

    @IsInt()
    publishedYear: number;
}
