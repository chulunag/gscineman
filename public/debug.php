<?php

require_once $_SERVER ['DOCUMENT_ROOT'] . '/vendor/PHPExcel.php';
require_once $_SERVER ['DOCUMENT_ROOT'] . '/vendor/PHPExcel/Writer/Excel2007.php';

$excel = new PHPExcel();

$sheet = $excel->getActiveSheet();
$sheet->setTitle("SheetCurrent");

$sheet_A = $excel->createSheet();
$sheet_A->setTitle("Sheet-A");

$sheet_B = $excel->createSheet();
$sheet_B->setTitle("Sheet-B");
        
$excel_output = new PHPExcel_Writer_Excel2007($excel);
$excel_output->save($_SERVER ['DOCUMENT_ROOT'] . '/tmp/Example.xlsx');