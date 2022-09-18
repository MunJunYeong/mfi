import { SetMetadata } from "@nestjs/common";

export const TYPEORM_EX_CUSTOM_REPOSITORY = "TYPEORM_EX_CUSTOM_REPOSITORY";


export function CustomRepository(entity: Function): ClassDecorator {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}

// @CustomRepository 데코레이터를 생성해준다.
// SetMetadata() 메서드를 이용하여 전달받은 Entity를 TYPEORM_EX_CUSTOM_REPOSITORY 메타데이터에 지정해준다.
// SetMetadata를 이용해서 특정한 token 값으로 entity를 저장하는 로직