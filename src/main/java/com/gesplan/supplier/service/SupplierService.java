package com.gesplan.supplier.service;

import com.gesplan.supplier.model.Supplier;
import com.gesplan.supplier.repository.SupplierRepository;
import com.gesplan.supplier.shared.ValidationUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SupplierService
{
	private final SupplierRepository supplierRepository;
	private final ValidationUtils validationUtils = new ValidationUtils();

	@Autowired
	public SupplierService(SupplierRepository supplierRepository)
	{
		this.supplierRepository = supplierRepository;
	}

	public List<Supplier> getAllSuppliers()
	{
		return supplierRepository.findAll();
	}

	public Optional<Supplier> getSupplierById(Long id)
	{
		return supplierRepository.findById(id);
	}

	public Supplier saveSupplier(Supplier supplier) {
		validationUtils.validateRequiredFields(supplier); // Valida campos obrigatórios

		if (!validationUtils.isValidEmail(supplier.getEmail())) {
			throw new IllegalArgumentException("E-mail do fornecedor inválido: " + supplier.getEmail());
		}

		for (String phone : supplier.getPhones()) {
			if (!validationUtils.isValidPhoneNumber(phone)) {
				throw new IllegalArgumentException("Telefone inválido: " + phone);
			}
		}

		return supplierRepository.save(supplier);
	}

	public void deleteSuppliers(List<Long> ids)
	{
		supplierRepository.deleteAllById(ids);
	}
}
