package com.hotelresto.management.controller;

import com.hotelresto.management.dto.MenuItemDTO;
import com.hotelresto.management.model.Category;
import com.hotelresto.management.service.MenuService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/menu")
@Tag(name = "Menu Management", description = "Menu item CRUD and availability APIs")
public class MenuController {

    private final MenuService menuService;

    public MenuController(MenuService menuService) {
        this.menuService = menuService;
    }

    @Operation(summary = "Get all menu items")
    @GetMapping
    public ResponseEntity<List<MenuItemDTO>> getAllMenuItems() {
        return ResponseEntity.ok(menuService.getAllMenuItems());
    }

    @Operation(summary = "Get available menu items")
    @GetMapping("/available")
    public ResponseEntity<List<MenuItemDTO>> getAvailableMenuItems() {
        return ResponseEntity.ok(menuService.getAvailableMenuItems());
    }

    @Operation(summary = "Get all categories")
    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok(menuService.getAllCategories());
    }

    @Operation(summary = "Create menu item (Admin/Staff only)")
    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<MenuItemDTO> createMenuItem(@RequestBody MenuItemDTO dto) {
        return ResponseEntity.ok(menuService.createMenuItem(dto));
    }

    @Operation(summary = "Update menu item (Admin/Staff only)")
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ResponseEntity<MenuItemDTO> updateMenuItem(@PathVariable Long id, @RequestBody MenuItemDTO dto) {
        return ResponseEntity.ok(menuService.updateMenuItem(id, dto));
    }

    @Operation(summary = "Delete menu item (Admin only)")
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteMenuItem(@PathVariable Long id) {
        menuService.deleteMenuItem(id);
        return ResponseEntity.ok().build();
    }
}
