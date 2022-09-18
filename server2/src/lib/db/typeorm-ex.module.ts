import { DynamicModule, Provider } from "@nestjs/common";
import { getDataSourceToken } from "@nestjs/typeorm";
import { DataSource } from "typeorm";
import { TYPEORM_EX_CUSTOM_REPOSITORY } from "./typeorm-ex.decorator";


export class TypeOrmExModule {
    public static forCustomRepository<T extends new (...args: any[]) => any>(repositories: T[]): DynamicModule {
        const providers: Provider[] = [];
        
        for (const repository of repositories) {
          const entity = Reflect.getMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, repository);
        
          if (!entity) {
            continue;
          }
        
          providers.push({
            inject: [getDataSourceToken()],
            provide: repository,
            useFactory: (dataSource: DataSource): typeof repository => {
              const baseRepository = dataSource.getRepository<any>(entity);
              return new repository(baseRepository.target, baseRepository.manager, baseRepository.queryRunner);
            },
          });
        }
  
        return {
            exports: providers,
            module: TypeOrmExModule,
            providers,
        };
    }
}
// @CustomRepository 데코레이터가 적용된 Repository를 받아줄 모듈이다.
// Reflect.getMetadata() 메서드로 메타데이터 키값인 TYPEORM_EX_CUSTOM_REPOSITORY에 해당되는 엔티티를 가져온다.
// 메타데이터 키값에 해당하는 엔티티가 존재하는 경우 Factory를 이용하여 provider를 동적으로 생성하여 providers에 추가한다.