const handleErrors = (err) => {
  let errors = { email: '', password: '' }

  // SingUp Errors

  if (err.message.includes('Veuillez entrer une adresse e-mail')) {
    errors.email = 'Veuillez entrer une adresse e-mail'
  }

  if (err.message.includes('Veuillez saisir une adresse électronique valide')) {
    errors.email = 'Veuillez saisir une adresse électronique valide'
  }

  if (err.message.includes('Veuillez entrer un mot de passe')) {
    errors.password = 'Veuillez entrer un mot de passe'
  }

  if (
    err.message.includes(
      'Le mot de passe doit comporter entre 8 et 19 lettres et doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial'
    )
  ) {
    errors.password =
      'Le mot de passe doit comporter entre 8 et 19 lettres et doit contenir au moins 1 minuscule, 1 majuscule, 1 chiffre et 1 caractère spécial'
  }

  if (err.code === 11000) {
    errors.email = 'Cet email est déjà enregistré'
    return errors
  }

  //Login Errors

  if (err.message === "L'adresse mail ne pas enregistré") {
    errors.email = "L'adresse mail ne pas enregistré"
  }

  if (err.message === 'Mot de passe incorrect') {
    errors.password = 'Mot de passe incorrect'
  }

  if (err.message.includes('user validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message
    })
  }

  return errors
}

module.exports = handleErrors
