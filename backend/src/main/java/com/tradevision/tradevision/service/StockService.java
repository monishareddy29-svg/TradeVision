package com.tradevision.tradevision.service;

import com.tradevision.tradevision.entity.Stock;
import com.tradevision.tradevision.repository.StockRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StockService {

    private final StockRepository stockRepository;

    public StockService(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    // Get all stocks
    public List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    // Get stock by symbol
    public Stock getStockBySymbol(String symbol) {
        return stockRepository.findBySymbol(symbol)
                .orElseThrow(() -> new RuntimeException("Stock not found"));
    }

    // Add a stock
    public Stock addStock(Stock stock) {

        if (stockRepository.existsBySymbol(stock.getSymbol())) {
            throw new RuntimeException("Stock already exists");
        }

        return stockRepository.save(stock);
    }

    // Update a stock
    public Stock updateStock(Long id, Stock stock) {

        Stock existingStock = stockRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        existingStock.setSymbol(stock.getSymbol());
        existingStock.setCompanyName(stock.getCompanyName());
        existingStock.setPrice(stock.getPrice());
        existingStock.setChangePercent(stock.getChangePercent());
        existingStock.setVolume(stock.getVolume());

        return stockRepository.save(existingStock);
    }

    // Delete a stock
    public void deleteStock(Long id) {

        if (!stockRepository.existsById(id)) {
            throw new RuntimeException("Stock not found");
        }

        stockRepository.deleteById(id);
    }
}