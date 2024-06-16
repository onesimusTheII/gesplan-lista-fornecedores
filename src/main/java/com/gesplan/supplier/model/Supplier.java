package com.gesplan.supplier.model;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Supplier {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String email;

	@ElementCollection
	private List<String> phones;

	private String type;
	private String observation;
	private Boolean favorite;
}
