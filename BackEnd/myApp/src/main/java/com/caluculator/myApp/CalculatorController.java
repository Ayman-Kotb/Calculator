package com.caluculator.myApp;

import javax.script.*;
import java.beans.*;
import java.util.* ;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;
import net.objecthunter.exp4j.Expression;
import net.objecthunter.exp4j.ExpressionBuilder;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value = "api")
public class CalculatorController {

    @PostMapping("/calculate")
    public String calculate (@RequestBody exp str){
        try {
            str.setExpression(str.getExpression().replace("%", "*0.01"));
            str.setExpression(str.getExpression().replace("÷" , "/") );
            str.setExpression(str.getExpression().replace("×" , "*") );
            str.setExpression(str.getExpression().replace("−", "-"));
            Expression exp = new ExpressionBuilder(str.getExpression()).build();
            double res = exp.evaluate();
            if (Double.isInfinite(res)) {
                return ("Error, Division by zero");
            }
            return (String.valueOf(res)) ;
        }
        catch (ArithmeticException e){
            return ("Error, Division by zero");
        }
        catch (Exception e) {
            return ("Error, Invalid Experssion");
        }
    }
}
