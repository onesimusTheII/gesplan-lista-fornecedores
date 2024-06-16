package com.gesplan.supplier.controller;

import com.gesplan.supplier.model.Supplier;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.gesplan.supplier.service.SupplierService;

import java.util.List;

@RestController
@RequestMapping("desafio/api/suppliers")
public class SupplierController {

	private final SupplierService supplierService;

	@Autowired
	public SupplierController(SupplierService supplierService) {
		this.supplierService = supplierService;
	}

	@GetMapping
	public List<Supplier> getAllSuppliers() {
		return supplierService.getAllSuppliers();
	}

	@GetMapping("/{id}")
	public Supplier getSupplierById(@PathVariable Long id) {
		return supplierService.getSupplierById(id)
			.orElseThrow(() -> new RuntimeException("Fornecedor não encontrado com o ID: " + id));
	}

	@PostMapping
	public Supplier createSupplier(@RequestBody Supplier supplier) {
		return supplierService.saveSupplier(supplier);
	}

	@PutMapping("/{id}")
	public Supplier updateSupplier(@PathVariable Long id, @RequestBody Supplier supplierDetails) {
		Supplier supplier = supplierService.getSupplierById(id)
			.orElseThrow(() -> new RuntimeException("Fornecedor não encontrado com o ID: " + id));

		// Atualizar os detalhes do fornecedor com os dados recebidos
		supplier.setName(supplierDetails.getName());
		supplier.setEmail(supplierDetails.getEmail());
		supplier.setPhones(supplierDetails.getPhones());
		supplier.setType(supplierDetails.getType());
		supplier.setObservation(supplierDetails.getObservation());
		supplier.setFavorite(supplierDetails.getFavorite());

		return supplierService.saveSupplier(supplier);
	}

	@DeleteMapping
	public void deleteSuppliers(@RequestBody List<Long> ids) {
		supplierService.deleteSuppliers(ids);
	}

	@GetMapping("/test")
	public String testEndpoint() {
		return "Controller is working!";
	}
}
