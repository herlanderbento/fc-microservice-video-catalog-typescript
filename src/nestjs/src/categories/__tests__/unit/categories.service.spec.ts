import { CategoriesService } from '../../categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [CategoriesService],
    // }).compile();

    // service = module.get<CategoriesService>(CategoriesService);
    service = new CategoriesService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
