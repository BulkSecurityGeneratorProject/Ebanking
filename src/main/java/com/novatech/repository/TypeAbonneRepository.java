package com.novatech.repository;

import com.novatech.domain.TypeAbonne;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the TypeAbonne entity.
 */
@SuppressWarnings("unused")
@Repository
public interface TypeAbonneRepository extends JpaRepository<TypeAbonne, Long> {

    Page<TypeAbonne> findByDeletedFalseOrderByLibelle(Pageable pageable);
}
