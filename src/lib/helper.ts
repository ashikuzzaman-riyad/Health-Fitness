

export const cleanString = (input: string, slugify = false) => {
  const cleaned = input.trim().replace(/\s+/g, slugify ? "-" : " ");
  return slugify ? cleaned.toLowerCase() : cleaned;
};

// Standard API response
export const sendSuccess = (res: any, data: any, message = "Success") => {
  res.status(200).json({ success: true, message, data });
};

export const sendError = (res: any, message = "Error", error?: any) => {
  res.status(500).json({ success: false, message, error });
};
