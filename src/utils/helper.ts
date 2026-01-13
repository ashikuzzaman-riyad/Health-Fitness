

export const cleanString = (input: string, slugify = false) => {
  const cleaned = input.trim().replace(/\s+/g, slugify ? "-" : " ");
  return slugify ? cleaned.toLowerCase() : cleaned;
};


