<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\URL;

class InstallController extends Controller
{
    public function step0()
    {
        return view('installation.step0');
    }

    public function step1()
    {
        $permission['curl_enabled'] = function_exists('curl_version');
        $permission['symlink_enabled'] = function_exists('symlink');
        $permission['db_file_write_perm'] = is_writable(base_path('.env'));

        return view('installation.step1', compact('permission'));
    }

    public function step2()
    {
        // write app url to env
        $this->writeEnvironmentFile('APP_URL', URL::to('/'));
        // create symlink
        Artisan::call('storage:link');

        return view('installation.step2');
    }

    public function step3()
    {
        if (!self::core()){
            return redirect()->route('step2');
        }
        return view('installation.step3');
    }

    public function step4()
    {
        if (!self::core()){
            return redirect()->route('step2');
        }
        return view('installation.step4');
    }

    public function step5()
    {
        if (!self::core()){
            return redirect()->route('step2');
        }
        return view('installation.step5');
    }

    public function database_installation(Request $request)
    {
        try {
            self::check_database_connection($request->DB_HOST, $request->DB_DATABASE, $request->DB_USERNAME, $request->DB_PASSWORD);
            $path = base_path('.env');
            if (file_exists($path)) {
                foreach ($request->types as $type) {
                    $this->writeEnvironmentFile($type, $request[$type]);
                }

                return redirect('step4');
            } else {
                return redirect('step3');
            }
        } catch (\Exception $exception) {
            return redirect()->route('step3')->with('error', $exception->getMessage());
        }
    }

    public function import_sql()
    {
        $sql_path = base_path('arino.sql');
        DB::unprepared(file_get_contents($sql_path));

        return redirect('step5');
    }

    private function check_database_connection($db_host = '', $db_name = '', $db_user = '', $db_pass = '')
    {
        try {
            $connection = @mysqli_connect($db_host, $db_user, $db_pass, $db_name);
            $connection->close();
        } catch (\mysqli_sql_exception $exception) {
            throw new \Exception($exception->getMessage());
        }
    }

    public function system_settings(Request $request)
    {
        $this->writeEnvironmentFile('APP_NAME', $request->system_name);
        User::create([
            'id' => 1,
            'name' => $request->admin_name,
            'email' => $request->admin_email,
            'password' => Hash::make($request->admin_password),
            'email_verified_at' => date('Y-m-d H:m:s'),
        ])->assignRole('admin');

        $this->writeEnvironmentFile('IS_INSTALLED', true);

        //sleep(5);
        return view('installation.step6');

        // return redirect('step6');
    }

    private function writeEnvironmentFile($type, $val)
    {
        $path = base_path('.env');
        if (file_exists($path)) {
            $val = trim($val);
            if (is_numeric(strpos(file_get_contents($path), $type)) && strpos(file_get_contents($path), $type) >= 0) {
                file_put_contents($path, str_replace(
                    $type.'='.env($type), $type.'='.$val, file_get_contents($path)
                ));
            }
        }
    }

    public function verify_purchase(Request $request)
    {
        try {
            $this->verify($request->purchase_code, $request->username);
            return redirect('step3');
        } catch (\Exception $exception){
            return back()->with('error', $exception->getMessage())->withInput();
        }
    }
}
