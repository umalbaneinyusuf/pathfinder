export const ENV = {
  get databaseUrl() { return process.env.DATABASE_URL ?? ""; },
  get ownerOpenId() { return process.env.OWNER_OPEN_ID ?? ""; },
  get llmApiUrl() { return process.env.LLM_API_URL ?? ""; },
  get llmApiKey() { return process.env.LLM_API_KEY ?? ""; },
};
