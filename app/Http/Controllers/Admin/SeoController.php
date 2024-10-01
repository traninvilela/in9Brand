<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Repositories\Admin\SeoRepository;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class SeoController extends Controller
{

    /**
     * Generate sitemap
     *
     * @param SeoRepository $repository
     * @return RedirectResponse
     */
    public function generateSitemap(SeoRepository $repository): RedirectResponse
    {
        $repository->generateSitemap();
        return back()->with('success', 'Sitemap generate successfully done');
    }
}
