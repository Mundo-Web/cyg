<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\BasicController;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\InfoproductCategory;
use Illuminate\Http\Request;

class InfoproductCategoryController extends BasicController
{
    public $model = InfoproductCategory::class;
    public $reactView = 'Admin/InfoproductCategories';
}
