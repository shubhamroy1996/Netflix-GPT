import openAI from 'openai'
import { OPENAI_KEY } from './constant'

const openai = new openAI({
  apiKey: OPENAI_KEY,
  dangerouslyAllowBrowser: true
})

export default openai