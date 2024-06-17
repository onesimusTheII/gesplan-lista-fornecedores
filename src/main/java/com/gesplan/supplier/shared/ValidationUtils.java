package com.gesplan.supplier.shared;

import java.util.regex.Pattern;
import com.gesplan.supplier.model.Supplier;

public class ValidationUtils
{
	public void validateRequiredFields(Supplier supplier)
	{
		if (supplier.getName() == null || supplier.getName().trim().isEmpty())
		{
			throw new IllegalArgumentException(
				"Campo Nome é obrigatório, por favor preencha para prosseguir.");
		}

		if (supplier.getEmail() == null || supplier.getEmail().trim().isEmpty())
		{
			throw new IllegalArgumentException(
				"Campo E-mail é obrigatório, por favor preencha para prosseguir.");
		}

		if (supplier.getType() == null || supplier.getType().trim().isEmpty())
		{
			throw new IllegalArgumentException(
				"Campo Tipo de Fornecedor é obrigatório, por favor preencha para prosseguir.");
		}

		if (supplier.getPhones() == null || supplier.getPhones().isEmpty())
		{
			throw new IllegalArgumentException(
				"Campo Telefones é obrigatório, por favor preencha para prosseguir.");
		}
	}

	public boolean isValidEmail(String email)
	{
		if (email == null)
		{
			return false;
		}
		String regex = "^[a-zA-Z0-9_+&*-]+(?:\\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{2,7}$";
		return Pattern.compile(regex).matcher(email).matches();
	}

	public boolean isValidPhoneNumber(String phoneNumber) {
		if (phoneNumber == null) {
			return false;
		}
		// Define o regex para os dois formatos aceitos
		String regex = "^\\(\\d{2}\\) \\d{4}-\\d{4}$|^\\(\\d{2}\\) \\d \\d{4}-\\d{4}$";
		return Pattern.compile(regex).matcher(phoneNumber).matches();
	}
}
