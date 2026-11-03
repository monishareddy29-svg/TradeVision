package com.tradevision.tradevision.controller;

import com.tradevision.tradevision.entity.Stock;
import com.tradevision.tradevision.service.StockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:5173")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    // Get all stocks
    @GetMapping
    public List<Stock> getAllStocks() {
        return stockService.getAllStocks();
    }

    // Get stock by symbol
    @GetMapping("/{symbol}")
    public Stock getStockBySymbol(@PathVariable String symbol) {
        return stockService.getStockBySymbol(symbol);
    }

    // Add new stock
    @PostMapping
    public Stock addStock(@RequestBody Stock stock) {
        return stockService.addStock(stock);
    }

    // Update stock
    @PutMapping("/{id}")
    public Stock updateStock(
            @PathVariable Long id,
            @RequestBody Stock stock) {
        return stockService.updateStock(id, stock);
    }

    // Delete stock
    @DeleteMapping("/{id}")
    public String deleteStock(@PathVariable Long id) {
        stockService.deleteStock(id);
        return "Stock deleted successfully";
    }
}