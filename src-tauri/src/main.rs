// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::env;
use std::process::Command;

fn main() {
    let is_invidia = Command::new("lspci")
        .output()
        .map(|output| String::from_utf8_lossy(&output.stdout).contains("NVIDIA"))
        .unwrap_or(false);

    if is_invidia {
        env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
        env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
        env::set_var("GSK_RENDERER", "gl");
        env::set_var("__NV_DISABLE_EXPLICIT_SYNC", "1");
    }

    app_lib::run();
}
