import {defineCliConfig} from 'sanity/cli'

import * as dotenv from 'dotenv'

dotenv.config()

export default defineCliConfig({
  api: {
    projectId: '4gjyci47',
    dataset: 'production',
  },
})
