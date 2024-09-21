package main

import (
	"fmt"
	"syscall/js"
)

func calculateBMI(this js.Value, p []js.Value) interface{} {
	height := p[0].Float() / 100 // Convert height from cm to meters
	weight := p[1].Float()
	age := p[2].Int()
	gender := p[3].String()

	bmi := weight / (height * height)
	category := ""

	// Adjust category based on gender and age (simplified logic)
	if gender == "male" {
		if bmi < 18.5 {
			category = "Underweight"
		} else if bmi < 25 {
			category = "Normal"
		} else if bmi < 30 {
			category = "Overweight"
		} else {
			category = "Obesity"
		}
	} else if gender == "female" {
		if age > 50 && bmi >= 27 {
			category = "Overweight (adjusted for age)"
		} else {
			if bmi < 18.5 {
				category = "Underweight"
			} else if bmi < 24 {
				category = "Normal"
			} else if bmi < 30 {
				category = "Overweight"
			} else {
				category = "Obesity"
			}
		}
	}

	return js.ValueOf(map[string]interface{}{
		"bmi":      bmi,
		"category": category,
	})
}

func registerCallbacks() {
	js.Global().Set("calculateBMI", js.FuncOf(calculateBMI))
}

func main() {
	c := make(chan struct{}, 0)
	fmt.Println("WASM Go Initialized")
	registerCallbacks()
	<-c // Block forever
}
