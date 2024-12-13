export const getCookie = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    const cookie = parts.pop();
    if (cookie) {
      return cookie.split(";").shift() || null;
    }
  }
  return null;
};

export const setCookie = (
  name: string,
  value: string,
  daysToExpire: number = 7
): void => {
  if (!name || name.trim() === "") {
    throw new Error("Le nom du cookie ne peut pas être vide");
  }

  if (!Number.isInteger(daysToExpire) || daysToExpire < 0) {
    throw new Error(
      "Le nombre de jours avant expiration doit être un entier positif ou zéro"
    );
  }

  const expires = new Date();
  expires.setTime(expires.getTime() + daysToExpire * 24 * 60 * 60 * 1000);

  const encodedValue = encodeURIComponent(value);
  const cookieString = `${encodeURIComponent(
    name
  )}=${encodedValue}; path=/; secure; SameSite=Strict; expires=${expires.toUTCString()}`;

  try {
    document.cookie = cookieString;
  } catch (error) {
    console.error("Erreur lors de la définition du cookie:", error);
    throw new Error("Impossible de définir le cookie");
  }
};

export const deleteCookie = (name: string): void => {
  if (!name || name.trim() === "") {
    throw new Error("Le nom du cookie ne peut pas être vide");
  }

  if (getCookie(name) === null) {
    console.warn(
      `Le cookie "${name}" n'existe pas et ne peut donc pas être supprimé.`
    );
    return;
  }

  const pastDate = new Date(0).toUTCString();

  try {
    document.cookie = `${encodeURIComponent(
      name
    )}=; path=/; expires=${pastDate}; secure; SameSite=Strict`;
  } catch (error) {
    console.error("Erreur lors de la suppression du cookie:", error);
    throw new Error(`Impossible de supprimer le cookie "${name}"`);
  }
};
