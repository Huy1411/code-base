import env from '@/env';
import AuthorizedInstance from '@/services/authorized-api';

const EcoService = AuthorizedInstance(env.api.baseUrl.ecoService);

export default EcoService;
