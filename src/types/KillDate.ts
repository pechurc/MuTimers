import date from "date-and-time";

export default (message, phrase) => {
    if (!phrase) return new Date(Date.now());

    try {
        let valid = date.isValid(phrase, "DD/MM/YYYYTHH:mm");
        if (!valid) {
            return null;
        }
        return date.parse(phrase, "DD/MM/YYYYTHH:mm");
      } catch (e) {
        throw new Error(
          `\"${phrase}\" No es un formato valido para la fecha en que fue matado`
        );
      }
}